package com.cms.managementsystem.repository;

import com.cms.managementsystem.entity.SiteItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<SiteItems, Long> {
}
