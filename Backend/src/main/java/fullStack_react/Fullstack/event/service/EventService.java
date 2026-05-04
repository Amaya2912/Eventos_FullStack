package fullStack_react.Fullstack.event.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import fullStack_react.Fullstack.event.dto.EventRequest;
import fullStack_react.Fullstack.event.model.Event;
import fullStack_react.Fullstack.event.repository.EventRepository;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event create(EventRequest request, String userEmail) {
        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setDate(request.getDate());
        event.setCapacity(request.getCapacity());
        event.setCreatedByEmail(userEmail);

        return eventRepository.save(event);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public List<Event> findMyEvents(String userEmail) {
        return eventRepository.findByCreatedByEmail(userEmail);
    }

    public Event findById(String id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public Event update(String id, EventRequest request) {
        Event event = findById(id);
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setDate(request.getDate());
        event.setCapacity(request.getCapacity());

        return eventRepository.save(event);
    }

    public void delete(String id) {
        Event event = findById(id);
        eventRepository.delete(event);
    }
}
