package com.notification.repository;

import com.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * 알림 엔티티용 JPA Repository
 *
 * [역할]
 * - Notification 엔티티에 대한 CRUD 기능 제공
 * - UUID기반 ID를 이용한 조회/삭제 기능
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    //현재는 기본 메서드만 사용(findById, save, delete 등)
    //추후 필요한경우 Query 메서드 추가
}