package fullStack_react.Fullstack.event.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fullStack_react.Fullstack.event.dto.EventRequest;
import fullStack_react.Fullstack.event.model.Event;
import fullStack_react.Fullstack.event.service.EventService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Event create(@Valid @RequestBody EventRequest request, Principal principal) {
        return eventService.create(request, principal.getName());
    }

    @GetMapping
    public List<Event> findAll() {
        return eventService.findAll();
    }

    @GetMapping("/my")
    public List<Event> findMyEvents(Principal principal) {
        return eventService.findMyEvents(principal.getName());
    }

    @GetMapping("/{id}")
    public Event findById(@PathVariable String id) {
        return eventService.findById(id);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable String id, @Valid @RequestBody EventRequest request) {
        return eventService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        eventService.delete(id);
    }
}
