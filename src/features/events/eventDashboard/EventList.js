import EventListItem from "./EventListItem";

export default function EventList({ events, deleteEvent, setSelectedEvent }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem
          event={event}
          key={event.id}
          setSelectedEvent={setSelectedEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  );
}
