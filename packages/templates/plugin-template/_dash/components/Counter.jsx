export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <center>
        <h3>{this.state.count}</h3>
      </center>
    );
  }
}

export const Text = props => (
  <span style={{ color: 'blue' }}>{props.children}</span>
);

export const Text1 = props => (
    <span style={{ color: 'red' }}>{props.children}</span>
  );
  