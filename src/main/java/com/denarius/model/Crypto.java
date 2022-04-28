//package com.denarius.model;
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpHeaders;
//import org.apache.http.NameValuePair;
//import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.client.utils.URIBuilder;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.message.BasicNameValuePair;
//import org.apache.http.util.EntityUtils;
//
//import java.io.File;
//import java.io.IOException;
//import java.net.URISyntaxException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//public class Crypto {
//
//        private static String apiKey = "4bea4dfc-e6fa-4b96-a8ec-70bed20b68bb";
//
//        public static void main(String[] args) {
//            String uri = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";
//            List<NameValuePair> parameters = new ArrayList<NameValuePair>();
//            parameters.add(new BasicNameValuePair("id","1,1027"));
//
//
//            try {
//                String result = makeAPICall(uri, parameters);
//                System.out.println(result);
//            } catch (IOException e) {
//                System.out.println("Error: cannot access content - " + e.toString());
//            } catch (URISyntaxException e) {
//                System.out.println("Error: Invalid URL " + e.toString());
//            }
//        }
//
//        public static String makeAPICall(String uri, List<NameValuePair> parameters)
//                throws URISyntaxException, IOException {
//            String response_content = "";
//
//            URIBuilder query = new URIBuilder(uri);
//            query.addParameters(parameters);
//
//            CloseableHttpClient client = HttpClients.createDefault();
//            HttpGet request = new HttpGet(query.build());
//
//            request.setHeader(HttpHeaders.ACCEPT, "application/json");
//            request.addHeader("X-CMC_PRO_API_KEY", apiKey);
//
//            CloseableHttpResponse response = client.execute(request);
//
//            try {
//                System.out.println(response.getStatusLine());
//                HttpEntity entity = response.getEntity();
//                response_content = EntityUtils.toString(entity);
//                EntityUtils.consume(entity);
//            } finally {
//                response.close();
//            }
//
//
//            return response_content;
//        }
//    }
