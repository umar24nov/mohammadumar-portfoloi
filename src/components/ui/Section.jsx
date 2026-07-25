import useScrollReveal from "../../hooks/useScrollReveal";

export default function Section({ id, children }) {
  const ref = useScrollReveal();
  return (
    <section
      id={id}
      ref={ref}
      className="reveal py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10"
    >
      {children}
    </section>
  );
}
