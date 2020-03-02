import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import DatePicker from "react-date-picker"

import styles from "./contactForm.module.css"

const HostEventSection = () => {
  const [date, setDate] = useState(new Date())

  const data = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "/(/host-event)/" } }) {
          edges {
            node {
              frontmatter {
                title
                when {
                  label
                  placeholder
                }
                howmany {
                  label
                  placeholder
                }
                where {
                  label
                  placeholder
                }
                email {
                  label
                  placeholder
                }
              }
            }
          }
        }
      }
    `
  )
  const pageData = data.allMdx.edges[0].node.frontmatter
  const handleChange = newDate => {
    setDate(newDate)
  }

  return (
    <div className={styles.contactForm}>
      <div className={styles.container}>
        <h2>{pageData.title}</h2>
        <form
          name="host-event"
          method="POST"
          data-netlify="true"
          action="/tack"
        >
          <input type="hidden" name="form-name" value="host-event" />
          <div className={styles.inputContainer}>
            <label htmlFor="date">{pageData.when.label} *</label>
            <DatePicker
              format="y/M/d"
              locale="sv"
              onChange={handleChange}
              value={date}
              calendarClassName={styles.datePicker}
              className={styles.dateInput}
              calendarIcon={null}
            />
            <input
              type="hidden"
              name="when"
              placeholder={pageData.when.placeholder}
              value={date}
              readOnly
              id="date"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="how-many">{pageData.howmany.label} *</label>
            <input
              type="number"
              name="how-many"
              placeholder={pageData.howmany.placeholder}
              required
              id="how-many"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="where">{pageData.where.label} *</label>
            <input
              type="text"
              name="where"
              placeholder={pageData.where.placeholder}
              required
              id="where"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">{pageData.email.label} *</label>
            <input
              type="email"
              name="email"
              placeholder={pageData.email.placeholder}
              required
              id="email"
            />
          </div>
          <button type="submit">Skicka</button>
        </form>
      </div>
    </div>
  )
}

export default HostEventSection
