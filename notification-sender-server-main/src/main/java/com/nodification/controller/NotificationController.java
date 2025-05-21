package com.notification.controller;

import com.notification.dto.NotificationRequestDto;
import com.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 알림 등록 API 컨트롤러
 *
 * [기능]
 * - 클라이언트로부터 알림 등록 요청을 수신
 * - 요청 본문을 NotificationRequestDto로 받고, 서비스에 위임 처리
 * - 응답은 간단히 상태 메시지 또는 저장 ID 반환
 */
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /**
     * 알림 등록 엔드포인트
     * - 즉시 또는 예약 발송 요청을 처리
     *
     * @param requestDto 알림 요청 DTO
     * @return 저장된 알림 ID or 상태 메시지
     */
    @PostMapping
    public ResponseEntity<?> registerNotification(@RequestBody NotificationRequestDto requestDto) {
        notificationService.register(requestDto);

        return ResponseEntity.ok("알림 등록 완료");
    }

}