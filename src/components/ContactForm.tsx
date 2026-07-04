"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./ContactForm.module.css";

type Props = {
  compact?: boolean;
};

export function ContactForm({ compact = false }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          suburb: data.get("suburb"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      router.push("/thank-you/");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setStatus((s) => (s === "loading" ? "idle" : s));
    }
  }

  return (
    <form
      className={`${styles.form} ${compact ? styles.compact : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className={styles.field}>
          <label htmlFor="suburb">Suburb</label>
          <input id="suburb" name="suburb" type="text" required />
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        {!compact ? (
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={compact ? 2 : 4} required />
          </div>
        ) : null}
      </div>
      {compact ? (
        <div className={styles.field}>
          <label htmlFor="message-compact">Message</label>
          <textarea id="message-compact" name="message" rows={3} required />
        </div>
      ) : null}
      {errorMsg ? (
        <p className={styles.error} role="alert">
          {errorMsg}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request my quote →"}
      </button>
    </form>
  );
}
