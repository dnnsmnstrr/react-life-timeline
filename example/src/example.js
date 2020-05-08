var React = require('react');
var ReactDOM = require('react-dom');
var ReactLifeTimeline = require('react-life-timeline');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			events: [],
			lookup: {},
			loaded: false,
			today: new Date(),
			events_added: 0,
			timeout_id: null
		};
		this.EVENTS = [
			{date_start: new Date('1997-06-16'), title: 'Is born in Durham, North Carolina', color: '#FC004C'},
			{date_start: new Date('2000-09-01'), date_end: new Date('2015-05-30'), title: 'Lives in Garching (close to Munich), Germany.', color: '#95F268'},
			{date_start: new Date('2004-07-01'), date_end: new Date('2005-08-01'), title: 'Spends a year in Birmingham, Alabama.', color: '#95F268'},
			{date_start: new Date('2005-09-01'), date_end: new Date('2007-07-30'), title: 'One more year in Garching.', color: '#95F268'},
			{date_start: new Date('2007-08-01'), date_end: new Date('2012-07-30'), title: 'Lives in Markleeberg (close to Leipzig), Germany.', color: '#95F268'},
			{date_start: new Date('2012-09-01'), date_end: new Date('2015-05-30'), title: 'Visits the German International School New York.', color: '#95F268'},
			{date_start: new Date('2016-10-15'), date_end: new Date('2017-08-30'), title: 'Studies Engineering Sciences at TUM.'},
			{date_start: new Date('2017-10-20'), date_end: new Date('2018-06-30'), title: 'Attends the Apple Developer Academy in Naples, Italy.', color: '#F500F7'},
			{date_start: new Date('2018-10-15'), date_end: new Date('2019-04-01'), title: 'Studies Computer Science at TU Darmstadt'},
			{date_start: new Date('2019-08-01'), title: 'Begins his apprenticeship at hpm.'},
		];

		this.EVENTS_WITH_ONGOING = [
			{date_start: new Date('2017-02-01'), date_end: new Date('2017-02-20'), title: 'Sample prior event', color: '#FC004C'},
			{date_start: new Date('2017-04-01'), title: 'Sample ongoing event', color: '#2276FF', ongoing: true},
		];

		let today = new Date();
		let future_start = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
		let future_end = new Date(future_start.getTime());
		future_end.setDate(future_end.getDate() + 7);
		this.EVENTS_WITH_FUTURE = [
			{date_start: new Date('2017-02-01'), date_end: new Date('2017-02-20'), title: 'Sample prior event', color: '#FC004C'},
			{date_start: future_start, date_end: future_end, title: 'Sample future event', color: '#FD691C'},
		];
	}

	generate_events(cb) {
		cb(this.EVENTS);
	}

	componentDidMount() {
	}

	add_incremental_event(force_index) {
		let {events_added} = this.state;
		let next_index = force_index == null ? events_added+1 : force_index;
		if (next_index < this.EVENTS.length) {
			this.setState({events_added: next_index}, () => {
				let timeout_id = window.setTimeout(this.add_incremental_event.bind(this), 1000);
				this.setState({timeout_id: timeout_id});
			});
		}
	}

	incremental_events() {
		return this.EVENTS.slice(0, this.state.events_added);
	}

	restart_incremental() {
		let {timeout_id} = this.state;
		if (timeout_id != null) window.clearInterval(timeout_id);
		this.add_incremental_event(0);
	}

	render () {
		return (
			<div>
				<h1>Dennis Muensterer - Life by Weeks</h1>

				<ReactLifeTimeline
						subject_name="Dennis"
						birthday={new Date("1961-08-04")}
						get_events={this.generate_events.bind(this)} />

				<h2>Adding Incrementally via props</h2>

				<ReactLifeTimeline
						subject_name="Barack"
						birthday={new Date("1997-06-16")}
						events={this.incremental_events()} />
				<p>
					<a href="javascript:void(0)" onClick={this.restart_incremental.bind(this)}>Play Incremental / Restart</a>
				</p>

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
