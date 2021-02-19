package com.template.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// Controller
@RestController
public class HelloWorldController {


	// GET
	// URI - /hello-world

	// Method - "Hello World"

	@RequestMapping(method = RequestMethod.GET, path = "/hello-world")
	// @GetMapping("/hello-world")
	public String helloWorld() {
		return "Hello World!";
	}

	// hello-world-bean
	@GetMapping("/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World!");
	}


	@GetMapping(path="/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hwllo World %s", name));

	}
}
