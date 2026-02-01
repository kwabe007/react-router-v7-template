import logoLight from "./logo-light.svg";
import logoDark from "./logo-dark.svg";
import Container from "~/components/Container";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-125 max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <Container className="space-y-4">
          <h1 className="text-center text-h2">
            Welcome to <span className="text-primary">React Router</span>!
          </h1>
          <p className="text-center">
            React Router is a full-stack React framework for routing, data
            loading, and server rendering.
          </p>
        </Container>
      </div>
    </main>
  );
}
