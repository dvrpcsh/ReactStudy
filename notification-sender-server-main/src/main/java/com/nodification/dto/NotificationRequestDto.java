package com.notification.dto;

import com.notification.domain.NotificationType;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 클라이언트에서 알림 등록 요청 시 사용하는 DTO
 * - 즉시 발송: sendAt = null;
 * - 에약 발송: sendAt = 미래 시각
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationRequestDto {

    /**
     * 고객ID
     * - 알림 대상이 되는 고객 식별자
     */
    private String title;

    /**
     * 본문 내용
     */
    private String content;

    /**
     * 발송 채널 타입(SMS, EMAIL, KAKAOTALK)
     */
    private NotificationType type;

    /**
     * 발송 요청 시각(예약 발송을 위한 시각)
     * - 즉시 발송 시 null
     */
    private LocalDateTime sendAt;
}