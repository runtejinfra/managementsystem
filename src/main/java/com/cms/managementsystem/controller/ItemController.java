package com.cms.managementsystem.controller;

import com.cms.managementsystem.entity.SiteItems;
import com.cms.managementsystem.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
//@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<SiteItems> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public Optional<SiteItems> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @PostMapping()
    public String addItem(@RequestBody SiteItems item) {
        System.out.println(item.toString());
        SiteItems siteItems = itemService.saveItem(item);
        System.out.println("site itesm return "+siteItems);
        return "index";
    }

    @PutMapping("/{id}")
    public SiteItems updateItem(@PathVariable Long id, @RequestBody SiteItems item) {
        item.setId(id);
        return itemService.saveItem(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }
}
