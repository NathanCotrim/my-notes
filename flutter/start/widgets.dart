// Material = Android Design System
// Cupertino = IOS Design System

// -------------------------------------

// Stateless Widget
// It's renderized once and its state never changes

class StatelessWidgetExample1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: 'Example')
  }
}

// -------------------------------------

// Scaffold(like structure)

class StatelessWidgetExample2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Example',
      home: Scaffold(appBar: AppBar())
    )
  }
}

// -------------------------------------

// Container(like a div)

class StatelessWidgetExample3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Example',
      home: Scaffold(
        appBar: AppBar(),
        body: Center(
          child: Container(
            decoration: BoxDecoration(
              color: Colors.purple
            )
          )
        )
      )
    )
  }
}