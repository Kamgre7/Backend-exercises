// https://refactoring.guru/pl/design-patterns/decorator/typescript/example

interface Component {
  operation(): string;
}

export class ConcreteComponent implements Component {
  operation(): string {
    console.log('ConcreteComponent');
    return 'ConcreteComponent';
  }
}

export class Decorator implements Component {
  constructor(protected component: Component) {}

  operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

const simple = new ConcreteComponent();

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);

// decorator2 result = 'ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))'
