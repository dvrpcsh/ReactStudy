package com.notification.kafka;

import com.notification.kafka.dto.NotificationSentEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/**
 * Kafka 알림 프로듀서
 *
 * [역할]
 * - NotificationSentEvent 객체를 Kafka 토픽(notification.send)으로 전송함
 * - KafkaTemplate을 활용한 비동기 전송 방식
 *
 * [사용 시점]
 * - 즉시 발송 요청 시
 * - 예약 발송 처리 시(예약 시간 도달 시 Redis consumer에서 호출)
 *
 * [장점]
 * - 비동기 발송으로 응답 지연 없이 처리 가능
 * - 실패 시 콜백 기반으로 로깅 처리 -> 향후 DeadLetter 처리 구조로 확장 가능
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationProducer {

    // KafkaTemplate 주입: 문자열 키, 알림 이벤트 객체
    private final KafkaTemplate<String, NotificationSentEvent> kafkaTemplate;

    // 사용할 Kafka 토픽명(확장성을 위해 추후 Config로 분리 가능)
    private static final String TOPIC_NAME = "notification.send";

    /**
     * Kafka로 알림 이벤트 메시지를 전송하는 메서드
     *
     * @param event NotificationSentEvent - Kafka에 발행할 알림 메시지
     *              
     * [흐름]
     * 1. KafkaTemplate.send()로 Kafka에 메시지 발행 시도
     * 2. 성공 시: 성공 로그 출력
     * 3. 실패 시: 예외 로그 출력
     */
    public void send(NotificationSentEvent event) {
        log.info("Kafka 발송 요청 -> {}", event);

        // Kafka 비동기 전송
        kafkaTemplate.send(TOPIC_NAME, event)
                .addCallback(
                        // 전송 성공 시 콜백
                        result -> log.info("Kafka 전송 성공: {}", result.getProducerRecord().value()),
                        // 전송 실패 시 콜백
                        ex -> log.error("Kafka 전송 실패", ex)
                );
    }
}