export function Message() {
  const name: string = "El-Dimaron";

  if (name) {
    return <h1>Hello {name}</h1>;
  } else {
    return <h1>Hello World</h1>;
  }
}
