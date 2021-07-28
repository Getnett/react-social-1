import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'

export default function EventFilters({ filter, setFilter, loading }) {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          disabled={loading}
          onClick={() => setFilter('filter', 'all')}
          active={filter.get('filter') === 'all'}
          content="All Events"
        />
        <Menu.Item
          disabled={loading}
          onClick={() => setFilter('filter', 'isGoing')}
          active={filter.get('filter') === 'isGoing'}
          content="I'm going"
        />
        <Menu.Item
          disabled={loading}
          onClick={() => setFilter('filter', 'isHosting')}
          active={filter.get('filter') === 'isHosting'}
          content="I'm hosting"
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date) => setFilter('startDate', date)}
        value={filter.get('startDate') || new Date()}
        tileDisabled={() => loading}
      />
    </>
  )
}
