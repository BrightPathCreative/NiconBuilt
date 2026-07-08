"use client";

/** Site contact form — posts to /api/contact → GHL_WEBHOOK_URL. */

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_PAGES } from "@/lib/service-page-config";
import styles from "./ContactForm.module.css";

const SERVICE_OPTIONS = [
  ...SERVICE_PAGES.map((page) => page.tileTitle),
  "Other",
] as const;

type Props = {
  compact?: boolean;
  showTitle?: boolean;
};

export function ContactForm({ compact = false, showTitle = true }: Props) {
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
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          phone: data.get("phone"),
          email: data.get("email"),
          serviceType: data.get("serviceType"),
          suburb: data.get("suburb"),
          project: data.get("project"),
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
      {showTitle ? <h2 className={styles.title}>Get in Touch</h2> : null}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="serviceType">What do you need help with?</label>
        <select id="serviceType" name="serviceType" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="suburb">Your suburb</label>
        <input id="suburb" name="suburb" type="text" required autoComplete="address-level2" />
      </div>

      <div className={styles.field}>
        <label htmlFor="project">Tell us about your project</label>
        <textarea id="project" name="project" rows={compact ? 3 : 4} />
      </div>

      {errorMsg ? (
        <p className={styles.error} role="alert">
          {errorMsg}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send My Enquiry"}
      </button>
    </form>
  );
}
