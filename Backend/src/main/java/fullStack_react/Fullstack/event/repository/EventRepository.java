package fullStack_react.Fullstack.event.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import fullStack_react.Fullstack.event.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByCreatedByEmail(String createdByEmail);
}
