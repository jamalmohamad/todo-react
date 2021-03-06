package com.template.demo.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
		return new HelloWorldBean("Hello World! bean");
	}


	@GetMapping(path="/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		// throw new RuntimeException("Something went wrong!");
		return new HelloWorldBean(String.format("Hwllo World,  %s", name));

	}
}
