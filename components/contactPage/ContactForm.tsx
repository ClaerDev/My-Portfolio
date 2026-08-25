import { useForm, SubmitHandler } from "react-hook-form"
import { AiOutlineSwapRight } from "react-icons/ai"
import toast from "react-hot-toast"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { saveMessage } from "../../lib/adminMessages"

interface Inputs {
  fullName: string
  email: string
  message: string
}

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? ""
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ""

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  data.fullName,
          from_email: data.email,
          email:      data.email,
          reply_to:   data.email,
          message:    data.message,
        },
        { publicKey: PUBLIC_KEY }
      )
      console.log("EmailJS success:", result)
      // save to admin dashboard
      await saveMessage({ type: "contact", fullName: data.fullName, email: data.email, message: data.message })
      toast.success(
        `Thanks for reaching out, ${data.fullName}! I'll get back to you soon.`,
        { duration: 5000 }
      )
      reset()
    } catch (err: any) {
      console.error("EmailJS error:", JSON.stringify(err))
      const msg = err?.text || err?.message || "Something went wrong. Please try again."
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="p-12" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 gap-8">
        <div>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            placeholder="Full Name"
            className="formStyle"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xl mt-2">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (v) => isValidEmail(v) || "Invalid email address",
            })}
            type="email"
            placeholder="Email Address"
            className="formStyle"
          />
          {errors.email && (
            <p className="text-red-500 text-xl mt-2">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Your Message"
          className="formStyle h-60"
        />
        {errors.message && (
          <p className="text-red-500 text-xl mt-2">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex items-center gap-4 px-10 py-5 bg-main-orange text-white text-2xl font-semibold uppercase hover:opacity-85 transition-opacity duration-200 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
        {!loading && <AiOutlineSwapRight className="text-3xl" />}
      </button>
    </form>
  )
}
