package com.notification.kafka;

import com.notification.kafka.dto.NotificationSentEvent;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.*;

import java.util.HashMap;
import java.tuil.Map;

/**
 * Kafka 프로듀서 설정 클래스
 * - KafkaTemplate를 통해 NotificationSentEvent 메시지를 Kafka로 전송 가능하도록 설정
 * - JSON 직렬화를 위해 Jackson 기반 JsonSerializer 사용
 */
@Configuration
public class KafkaConfig {

    /**
     * Kafka 프로듀서 설정 값 정의
     * - bootstrapServers, key/value serializer 등
     */
    @Bean
    public Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<>();

        // Kafka 서버 주소
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

        // Kafka 메시지 키/값 직렬화 방식
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
                org.springframework.kafka.support.serializer.JsonSerializer.class);

        // JSON 직렬화 시 type 정보를 포함(역직렬화 지원)
        props.put("spring.json.add.type.headers", false);

        return props;
    }

    /**
     * ProducerFactory 생성
     * - 설정 기반으로 Kafka Producer 인스턴스를 생성함
     */
    @Bean
    public ProducerFactory<String, NotificationSentEvent> producerFactory() {

        return new DefaultKafkaProducerFactory<>(producerConfigs());
    }

    /**
     * KafkaTemplate 등록
     * - 실제 Kafka 전송을 담당하는 객체
     */
    @Bean
    public KafkaTemplate<String, NotificationSentEvent> kafkaTemplate() {

        return new KafkaTemplate<>(producerFactory());
    }

}