package com.springboot.app_demo.infrastructure.controller;

import java.util.ArrayList;
import java.util.List;

import com.springboot.app_demo.domain.entity.Product;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    private List<Product> productList = new ArrayList<>();

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        productList.add(product);
        return product;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productList;
    }

    @DeleteMapping("/{code}")
    public void deleteProduct(@PathVariable String code) {
        productList.removeIf(product -> product.getCode().equals(code));
    }
}
