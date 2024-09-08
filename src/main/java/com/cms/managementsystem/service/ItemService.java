package com.cms.managementsystem.service;

import com.cms.managementsystem.entity.SiteItems;
import com.cms.managementsystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<SiteItems> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<SiteItems> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public SiteItems saveItem(SiteItems item) {

        double price = item.getPrice();
        int quantity = item.getQuantity();
        double amount = price * quantity;

        item.setAmount(amount);
        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
