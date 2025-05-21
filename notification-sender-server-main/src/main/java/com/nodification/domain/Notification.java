package com.notification.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * [Notification 엔티티 설명]
 * - 클라이언트로 부터 요청받은 알림 정보를 저장하는 엔티티
 * - 즉시 또는 예약 발송이 가능하며, 발송 채널과 상태 등을 포함함
 * - 이 데이터는 Kafka 발송 및 Redis 예약 큐 처리 시 핵심 기준이 됨
 */
@Entity
@Table(name = "notifications")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Notification {

    /**
     * UUID기반 고유 식별자
     * - 분산 시스템에서 충돌 없이 유일성 보장
     */
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    /**
     * 고객 식별자
     * - 고객 DB를 따로 관리하지 않고 ID만 문자열로 저장
     */
    @Column(nullable = false)
    private String customerId;

    /**
     * 알림 제목
     * - 실제 발송 시 제목으로 사용됨
     */
    @Column(nullable = false)
    private String title;

    /**
     * 알림 본문 내용
     * - JSON으로 보내는 실제 메시지 내용
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /**
     * 알림 발송 채널
     * - SMS, EMAIL, KAKAOTALK 중 하나
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    /**
     * 알림 상태
     * - PENDING, SENT, FAILED, RESERVED 등으로 상태를 관리
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationStatus status;

    /**
     * 발송 시각
     * - 즉시 발송이면 현재 시간 기준
     * - 예약 발송이면 미래 시간 지정
     */
    private LocalDateTime sendAt;

    /**
     * 생성 시각
     * - 최초 요청이 들어온 시간
     */
    @Column(updatable = false)
    private LocalDateTime = createdAt;

    /**
     * 수정 시각
     * - 상태 변경, 예약 발송 처리 등으로 갱신될 수 있음
     */
    private LocalDateTime updatedAt;

    /**
     * 엔티티 생성 전 자동 호출되어 생성일자 설정
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    /**
     * 엔티티 업데이트 전 자동 호출되어 수정일자 갱신
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}