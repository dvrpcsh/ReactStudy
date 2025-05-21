package com.notification.redis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

/**
 * Redis 기본 설정
 *
 * [역할]
 * - RedisTemplate을 등록하여 Redis ZSet 기반 DelayQueue를 사용할 수 있도록 설정
 * - 문자열 기반 키/값을 다루기 위해 StringRedisTemplate사용
 */
@Configuration
public class RedisConfig {

    /**
     * RedisTemplate 빈 등록
     * - 기본적인 String <-> String 구조로 직렬화
     */
    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) {

        return new StringRedisTemplate(redisConnectionFactory);
    }
}
