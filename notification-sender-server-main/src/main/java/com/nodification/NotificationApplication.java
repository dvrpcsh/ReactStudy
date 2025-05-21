package com.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * SpringBoot 애플리케이션 메인 진입점
 *
 *
 * [기능 요약]
 * @SpringBootApplication
 *  - 컴포넌트 스캔 (@Component, @Service 등 자동 탐지)
 *  - 자동 설정 (@EnableAutoConfiguration 포함)
 *  - 설정 클래스 등록 (@Configuration 역할)
 *
 * @EnableScheduling
 *  - @Scheduled 어노테이션이 붙은 메서드들을 주기적으로 실행할 수 있도록 스케줄링 기능 활성화
 *  - DelayQueueConsumer 등 예약 관련 기능 작동에 필수
 */
@EnableScheduling
@SpringBootApplication
public class NotificationApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationApplication.class, args);
    }
}
