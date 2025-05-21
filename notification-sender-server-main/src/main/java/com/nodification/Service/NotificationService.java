package com.notification.service;

import com.notification.domain.Notification;
import com.notification.domain.NotificationStatus;
import com.notification.dto.NotificationRequestDto;
import com.notification.kafka.NotificationSentEvent;
import com.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * 알림 등록 서비스
 *
 * [역할]
 * - 클라이언트로 부터 들어온 알림 등록 요청을 처리
 * [흐름]
 * 1.알림 요청을 DTO형태로 받음
 * 2.예약 발송인지 즉시 발송인지 분기
 * 3.Notification 엔티티 생성 및 DB 저장
 * 4.즉시 발송이면 Kafka로 발송 이벤트 전송
 * 5.예약 발송이면 Redis Delay Ququq 등록
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationProducer notificationProducer;

    /**
     * 알림 등록 메서드
     *
     * @param dto 클라이언트로 부터 받은 알림 요청 DTO
     */
    public void register(NotificationRequestDto dto) {

        //1.예약 발송 여부 확인
        boolean isScheduled = dto.getSendAt() != null;

        //2.알림 상태 결정(예약이면 RESERVED, 아니면 PENDING)
        NotificationStatus status = isScheduled ? NotificationStatus.RESERVED : NotificationStatus.PENDING;

        //3.알림 정보로 Notification 엔티티 생성 및 저장
        NotificationService notificationService = NotificationService.builder()
                .customerId(dto.getCustomerId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .type(dto.getType())
                .status(status)
                .sendAt(dto.getSendAt())
                .build();

        notificationService = notificationRepository.save(notification);
        log.info("[알림 저장 완료] ID: {}", notificationService.getId());

        //4.예약 발송인 경우: Redis Delay Queue에 등록
        if(isScheduled) {
            log.info("[예약 발송 등록] 발송 예정 시간: {}", dto.getSendAt());
            // TODO: Redis에 예약 발송 등록 처리
        //5.즉시 발송인 경우: Kafka 발송 이벤트 전송
        } else {
            NotificationSentEvent event = NotificationSentEvent.builder()
                    .notificationId(notification.getId())
                    .customerId(notificationService.getCustomerId())
                    .title(notificationService.getTitle())
                    .content(notification.getContent())
                    .type(notification.getType())
                    .sendAt(notification.getSendAt())
                    .build();

            log.info("[Kafka 발송 요청 시작] 알림 ID: {}", event.getNotificationId());
            notificationProducer.send(event);
        }


    }


}