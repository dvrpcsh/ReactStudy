package com.notification.domain;

/**
 * 알림의 발송 상태를 나타내는 열거형(enum)
 * - 상태별 흐름 예시:
 *  PEDING -> SENT / FAILED
 *  RESERVED -> PENDING(예약 시간이 되면)
 */
public enum NotificationStatus {

    /**
     * 발송 대기 상태(즉시 or 예약 모두 포함)
     */
    PENDING,

    /**
     * 예약 발송으로 등록되어 대기 중
     */
    RESERVED,

    /**
     * 정삭적으로 발송된 상태
     */
    SENT,

    /**
     * 발송 실패 상태(재시도 대상)
     */
    FAILED
}