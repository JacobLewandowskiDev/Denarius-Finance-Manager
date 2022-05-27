package com.denarius.controller;

import com.denarius.service.CoinMarketCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crypto.html")
public class CoinMarketCapController {

    @Autowired
    private CoinMarketCapService coinMarketCapService;

    public CoinMarketCapController(CoinMarketCapService coinMarketCapService) {
        this.coinMarketCapService = coinMarketCapService;
    }

    @GetMapping("/get-crypto-info")
    public String getCryptoPrices() {
        return coinMarketCapService.getCryptoPrices();
    }
}
