package com.notification.kafka.dto;

import com.notification.domain.NotificationType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Kafka로 전송되는 알림 이벤트 메시지 구조 정의
 * - 예약 또는 즉시 발송 시 공통으로 사용됨
 * - KafkaConsumer 혹은 예약 Consumer가 처리 대상
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class NotificationSentEvent {

    /**
     * 알림 UUID(Notification Entity의 ID)
     */
    private UUID notificationId;

    /**
     * 고객 ID(누구에게 보내는지)
     */
    private String customerId;

    /**
     * 알림 제목
     */
    private String title;

    /**
     * 알림 내용
     */
    private String content;

    /**
     * 알림 채널 종류(SMS, EMAIL, KAKAOTALK)
     */
    private NotificationType type;

    /**
     * 실제 발송 시각(즉시 or 예약 기준)
     */
    private LocalDateTime sendAt;
}