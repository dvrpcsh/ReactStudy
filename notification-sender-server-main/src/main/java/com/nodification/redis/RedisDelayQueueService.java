package com.notification.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Redis Delay Queue 등록/조회 서비스
 *
 * [설명]
 * - 예약된 알림을 Redis ZSet(정렬된 집합)에 등록하고
 * - 예약 시각이 지난 알림들을 찾아 Kafka로 발송하기 위해 꺼내는 역할을 수행
 *
 * [Redis 구조 설명]
 * - Redis의 ZSet 자료구조를 사용하여 (Key: notification:delay-queue)
 * - Value: 알림 UUID (String)
 * - Score: 예약 발송 시간의 timestamp(ms)
 * - ZSet은 Score 기준 정렬되어 있어 "현재 시간보다 이전"인 항목들을 순서대로 꺼낼 수 있음
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RedisDelayQueueService {

    private final StringRedisTemplate redisTemplate;
    //Redis ZSet의 키(예약 큐 고정 이름)
    private static final String DELAY_QUEUE_KEY = "notification:delay-queue";

    /**
     * 예약 알림을 ZSet에 등록
     * - 특정 알림 UUID를 예약 큐에 등록
     * - 예약 발송 시간(밀리초)을 score로 선정하여 ZSet에 셋팅
     *
     * @param notificationId 알림 UUID
     * @param sendAtMillis   예약 발송 시간(timestamp in millis)
     */
    public void addToDelayQueue(String notificationId, long sendAtMillis) {
        redisTemplate.opsForZSet().add(DELAY_QUEUE_KEY, notificationId, sendAtMillis);
        log.info("[예약 등록] 알림 ID={} 예약 시각(ms)={}", notificationId, sendAtMillis);
    }

    /**
     * 예약 시간에 도달한 알림 꺼내기 메서드
     * - 현재 시각을 기준으로 delay-queue 내 "발송 시각에 도달한 알림"만 조회
     * - 조회된 알림들은 Redis에서 제거하여 중복 발송 방지
     * - 비즈니스 로직에서 이 메서드를 주기적으로 polling 하여 Kafka로 전송해야 함
     *
     * @param maxCount 최대 꺼낼 개수(부하 제어 목적)
     * @return 예약 시간에 도달한 알림 ID 목록
     */
    public Set<String> pollDueNotifications(int maxCount) {

        //1.현재 시간 기준 timestamp(ms)
        long new = Instant.now().toEpochMilli();

        //2.ZSet에서 예약 시간이 현재 시간보다 작은 항목만 조회 (LIMIT 설정 포함)
        Set<String> ready = redisTemplate.opsForZSet()
                .rangeByScore(DELAY_QUEUE_KEY, 0, now, 0, maxCount);

        // 3. 이미 처리한 알림은 Redis ZSet에서 삭제 (중복 방지)
        if(ready != null && !ready.isEmpty()) {
            redisTemplate.opsForZSet().remove(DELAY_QUEUE_KEY, ready.toArray());
        }

        log.info("[도달 알림 {}건 조회]", ready != null ? ready.size() : 0);

        return ready;
    }
}