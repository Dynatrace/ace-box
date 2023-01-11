package org.dynatrace.ssrfservice.configuration;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.opentracing.noop.NoopTracerFactory;

@ConditionalOnProperty(value = "opentracing.jaeger.enabled", havingValue = "false")
@Configuration
public class NoopTracerConfiguration {

    @Bean
    public io.opentracing.Tracer jaegerTracer() {
        return NoopTracerFactory.create();
    }

}
