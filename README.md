# 📡 대규모 분산 알림 서비스 API

## 1️⃣ 지원자 정보  
**2595-000050_최상협_서버 개발자**

## 2️⃣ 프로젝트 설명
### 📌 프로젝트 개요

이 프로젝트는 Kafka, Redis 기반의 MAS(Microservice Agent System) 아키텍처로 구축된 **대규모 트래픽 처리 알림 서비스 API**입니다.  
즉시 및 예약 알림 등록, 장애 복구, 빠른 조회 응답을 목표로 하며, 1만 TPS 트래픽을 견딜 수 있는 고성능 분산 환경을 구현합니다.

## 🏗️ 아키텍처 설계 개요

[ 외부 클라이언트 (모바일, 웹) ]  
  │  
[ Node.js Gateway (Reverse Proxy, 인증) ]  
  │  
┌───▼────────────────────┐  
│ Spring Notification API │ ← WebFlux 기반 비동기 처리  
└────┬───────────────────┘  
    ▼  
[ 알림 등록/조회 서비스 ]  
 ├─ Redis (예약 큐 / 중복 방지 / Lock 관리)  
 ├─ Kafka (순서 보장 및 비동기 발송 큐)  
 └─ H2 + JPA (내역 저장, 예약 정보 보관)  
     
[ 알림 발송 서버 (Mock) → REST 연동 ]

## 🛠️ 기술 스택

| 계층       | 기술 스택                             | 선택 이유                                |
|------------|----------------------------------------|-------------------------------------------|
| Backend    | Java 17, Spring Boot 3, Spring WebFlux | 대규모 트래픽 대응, 논블로킹 처리 가능     |
| 비동기/예약 | Redis (Delay Queue), Kafka             | 순서 보장 + 예약 발송 + 장애 시 재처리 용이 |
| DB         | H2 (In-memory), JPA                    | 테스트 환경 적합 + ORM 활용                |
| 문서화     | Swagger (springdoc-openapi)            | API 테스트 및 자동 문서화 지원             |
| 인증       | (선택) JWT + Redis                     | 상태없는 인증, 확장 가능 구조               |

## 📦 주요 기능

### 알림 발송 등록 API
- 즉시/예약 발송 구분
- 예약 요청은 Redis Delay Queue에 저장
- FIFO 순서 처리 보장
- 장애 시 미발송 내역 재전송 처리

### 알림 내역 조회 API
- 최근 3개월 발송 이력 조회 (페이징 지원)
- 고객 ID 기반으로 조회
- 빠른 응답을 위한 인덱싱 및 최적화 구조

### 🧠 신경써서 구현한 부분

- **WebFlux + Kafka 조합**을 통한 논블로킹 환경 구축
- **Redis Delay Queue 구조**를 활용한 예약 알림 구현
- Kafka 장애 시 **재전송을 위한 Retry 로직 구현**
- SOLID 원칙 적용으로 각 모듈을 역할별로 설계하여 유지보수성과 확장성 확보

## 📂 디렉토리 구조 예시

```
src
├── notification
│   ├── controller       # REST API 정의
│   ├── service          # 비즈니스 로직 (즉시/예약 발송)
│   ├── repository       # JPA 인터페이스
│   ├── dto              # 요청/응답 객체
│   ├── scheduler        # 예약 발송 consumer
│   ├── kafka            # Kafka producer 설정
│   ├── redis            # Redis delay queue 처리
│   └── config           # 설정 클래스
└── common
    └── exception, util  # 공통 예외, 유틸 등
```

## ✅ SOLID 설계 원칙 적용

- **단일 책임 원칙**: 서비스 단위 기능 분리
- **개방/폐쇄 원칙**: 채널 확장을 위한 인터페이스 설계
- **리스코프 치환 원칙**: 구현체 대체 가능 설계
- **인터페이스 분리**: 발송자별 인터페이스 명확 분리
- **의존 역전 원칙**: 추상화 기반 DI 구조 설계

## 🧱 향후 확장 계획

- Kafka Consumer 장애 복구 자동화
- Elasticsearch 기반 로그 검색
- CI/CD 구축 및 Prometheus + Grafana 모니터링

## 3️⃣ 빌드 결과물 Download 링크

- **[👉 다운로드 링크 (예시)](https://example.com/download/notification-api.jar)**  
※ 실제 jar 파일 경로 또는 배포 링크로 대체해주세요.

---

## ✅ 실행 방법 (참고)

```bash
./gradlew clean build
java -jar build/libs/notification-api.jar
```

설정 예시 (`application.yml`):
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driverClassName: org.h2.Driver
  redis:
    host: localhost
    port: 6379
  kafka:
    bootstrap-servers: localhost:9092
notification:
  retry-count: 3

## 🧪 Swagger 테스트

- Swagger UI: http://localhost:8080/swagger-ui.html  
- 주요 테스트 API:
  - `POST /api/notifications` : 알림 등록
  - `GET /api/notifications?customerId=xxx&page=0&size=10` : 알림 내역 조회
```
