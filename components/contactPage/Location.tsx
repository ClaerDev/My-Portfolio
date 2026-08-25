import MyInfo from "../MyInfo"

export default function Location() {
  return (
    <div className="p-12">
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d209750.33516664647!2d135.30866491308594!3d34.69374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f18840de5dbd%3A0xef10bd780eb85b3c!2sOsaka%2C%20Japan!5e0!3m2!1sen!2sjp!4v1666978319596!5m2!1sen!2sjp"
          style={{ border: 0 } as React.CSSProperties}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96"
        />
      </div>

      <ul className="grid grid-cols-1 mt-8 sm:grid-cols-2">
        <MyInfo field="address"   value="Osaka, Japan" />
        <MyInfo field="email"     value="tobeiokita35@gmail.com" />
        <MyInfo field="phone"     value="+81 158 461 254" />
        <MyInfo field="freelance" value="Available" />
      </ul>
    </div>
  )
}
