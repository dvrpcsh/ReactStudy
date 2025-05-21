package com.notification.domain;

/**
 * 알림 발송 채널을 나타내는 열거형(enum)
 * -실제 외부 알림 발송 서버의 채널 API와 매핑됨
 */
public enum NotificationType {

    /**
     * 문자 메시지(SMS) 채널
     */
    SMS,

    /**
     * 이메일 채널
     */
    EMAIL,

    /**
     * 카카오톡 채널
     */
    KAKAOTALK
}