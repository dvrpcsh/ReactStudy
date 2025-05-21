package com.notification.redis;

import com.notification.domain.Notification;
import com.notification.domain.NotificationStatus;
import com.notification.kafka.NotificationProducer;
import com.notification.kafka.dto.NotificationSentEvent;
import com.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.tuil.UUID;

/**
 * DelayQueueConsumer - 예약 발송 담당 컴포넌트
 *
 * [역할]
 * - Redis DelayQueue(ZSet)에 등록된 예약 알림들을 주기적으로 조회
 * - 발송 시각이 도달한 알림들을 Kafka로 전송
 * - DB에서 알림 상태(PENDING)으로 변경 후 전송
 *
 * [실행 주기]
 * - 5초마다 실행(@Scheduled)
 * - 최대 10건씩 처리(혼잡 방지)
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DelayQueueConsumer {

    private final RedisDelayQueueService redisDelayQueueService;
    private final NotificationRepository notificationRepository;
    private final NotificationProducer notificationProducer;

    /**
     * 예약 도달 알림 소비 처리
     * - 5초마다 실행되어 Redis DelayQueue에서 도달한 항목을 꺼내 처리
     */
    @Scheduled(fixedRate = 5000)
    public void consume() {

        //1.도달한 예약 알림 UUID 조회(최대 10건)
        Set<String> readyIds = redisDelayQueueService.pollDueNotifications(10);

        //2.UUID별로 Kafka 전송 처리
        for(String id : readyIds) {
            try {
                UUID uuid = UUID.fromString(id);

                //3.알림 정보 DB조회
                Optional<Notification> optional = notificationRepository.findById(uuid);

                if(optional.isEmpty()) {
                    log.warn("알림 정보가 존재하지 않음 -> ID : {}", id);
                    continue;
                }

                Notification notification = optional.get();

                //4.알림상태를 RESERVED -> PENDING으로 변경 후 저장
                notification = notification.toBuilder()
                        .status(NotificationsStatus.PENDING)
                        .updatedAt(LocalDateTime.now())
                        .build();
                notificationRepository.save(notification);

                //5.Kafka 전송 객체 생성
                NotificationSentEvent event = NotificationsSentEvent.builder()
                        .notificationId(notification.getId())
                        .customerId(notification.getCustomerId())
                        .title(notification.getTitle())
                        .content(notification.getContent())
                        .type(notification.getType())
                        .sendAt(notification.getSendAt())
                        .build();

                //6.Kafka 발송 실행
                notificationProducer.send(event);
                log.info("예약 알림 발송 완료 -> {}", id);
            } catch (IllegalArgumentException e) {
                log.warn("UUID 파싱 실패 -> 잘못된 ID : {}", id);
            } catch (IllegalStateException e) {
                log.warn("DB에서 알림을 찾을 수 없음 -> ID : {}", id);
            } catch (Exception e) {
                //Kafka 전송 또는 예기치 않은 오류
                log.error("예약 발송 중 알 수 없는 오류 발생 -> ID : {}", id, e);
            }
        }
    }
}