package com.plate.mill.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.plate.mill.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.plate.mill.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.plate.mill.domain.User.class.getName());
            createCache(cm, com.plate.mill.domain.Authority.class.getName());
            createCache(cm, com.plate.mill.domain.User.class.getName() + ".authorities");
            createCache(cm, com.plate.mill.domain.Production.class.getName());
            createCache(cm, com.plate.mill.domain.EventOfPlateMill.class.getName());
            createCache(cm, com.plate.mill.domain.EventOfPlateMill.class.getName() + ".pictureOfEvents");
            createCache(cm, com.plate.mill.domain.PictureOfEvent.class.getName());
            createCache(cm, com.plate.mill.domain.ShiftManager.class.getName());
            createCache(cm, com.plate.mill.domain.ShiftManager.class.getName() + ".prods");
            createCache(cm, com.plate.mill.domain.ShiftManager.class.getName() + ".hpFinishes");
            createCache(cm, com.plate.mill.domain.ShiftManager.class.getName() + ".normaliseds");
            createCache(cm, com.plate.mill.domain.ShiftManager.class.getName() + ".shippings");
            createCache(cm, com.plate.mill.domain.HeavyPlateFinished.class.getName());
            createCache(cm, com.plate.mill.domain.Normalising.class.getName());
            createCache(cm, com.plate.mill.domain.Shipping.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
