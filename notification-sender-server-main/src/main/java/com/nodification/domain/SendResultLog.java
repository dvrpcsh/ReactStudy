package com.notification.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * [SendResultLog 엔티티 설명]
 * - 알림이 외부 발송 서버로 실제 요청됐을 때 결과를 기록하는 로그 엔티티
 * - 하나의 알림에 대해 여러 번 발송 시도가 가능하게 N:1관계를 가정
 * - 이 로그를 기반으로 실패 및 재처리, 장애 분석 등이 가능함
 */
@Entity
@Table(name = "send_result_logs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SendResultLog {

    /**
     * UUID 기반 고유 식별자
     * - 중복 없이 글로벌하게 고유한 값 생성
     */
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    /**
     * 알림(Notification) 식별자
     * - 어떤 알림에 대한 발송 결과인지 연결하기 위한 필드
     * - 외래키는 명시적 설정 대신 단순 UUID 저장
     */
    @Column(nullable = false, columnDefinition = "BINARY(16)")
    private UUID notificationId;

    /**
     * 결과 코드(성공 여부)
     * - SUCCESS: 정상 발송됨
     * - FAIL: 발송 실패
     */
    @Column(nullable = false)
    private String resultCode;

    /**
     * 응답 시간
     * - 알림 발송 요청 후 실제 응답이 온 시간
     * - 모니터링이나 통계에 활용 가능
     */
    private LocalDateTime responseTime;

    /**
     * 실패 시 오류 메시지
     * - resultCode가 FAIL일 때 상세한 이유를 기록
     * - 예: 타임아웃, 네트워크 오류 등
     */
    private String errorMessage;

    /**
     * 로그 생성 시각
     * - @PrePersist 훅을 통해 자동 세팅됨
     */
    @Column(updatable = false)
    private LocalDateTime createdAt;

    /**
     * 로그 생성 시 자동으로 현재 시간 입력
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}