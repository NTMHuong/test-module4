package com.example.thimodule4province.controller;

import com.example.thimodule4province.model.Province;
import com.example.thimodule4province.service.province.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/provinces")
public class ProvinceController {
    @Autowired
    private IProvinceService provinceService;

    @PostMapping
    public ResponseEntity<Province> createProvince(@RequestBody Province province) {
        return new ResponseEntity<>(provinceService.save(province), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Province>> showAll(@RequestParam(name = "q", required = false) Optional<String> q, @PageableDefault(size = 10) Pageable pageable) {
        Page<Province> provinces;
        if (!q.isPresent()) {
            provinces = provinceService.findAll(pageable);
        } else {
            provinces = provinceService.findAllByNameContaining(q.get(), pageable);
        }
        if (provinces.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(provinces, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Province> getById(@PathVariable Long id) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        if (!provinceOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(provinceOptional.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Province> updateProvince(@PathVariable Long id, @RequestBody Province province) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        if (!provinceOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            if (province.getId() == null) {
                province.setId(id);
            }
            provinceService.save(province);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Province> deleteProvince(@PathVariable Long id) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        if (!provinceOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        provinceService.remove(id);
        return new ResponseEntity<>(provinceOptional.get(), HttpStatus.OK);
    }
}
