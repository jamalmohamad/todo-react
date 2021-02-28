package com.template.demo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardCodedService {

	private static List<Todo> todos = new ArrayList<>();
	private static int idCounter = 0;

	// initialization
	static {
		todos.add(new Todo(++idCounter, "in28minutes", "Learn to dance", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Microservice", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn to Develop app", new Date(), false));
	}

	public List<Todo> findAll() {
		return todos;
	}


}
