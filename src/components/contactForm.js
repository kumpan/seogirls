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
        <form name="Host Event Form" method="POST" data-netlify="true">
          <input type="hidden" name="host-event" value="Host Event Form" />
          <div className={styles.inputContainer}>
            <label>{pageData.when.label}</label>
            <DatePicker
              format="y/MM/dd"
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
            />
          </div>
          <div className={styles.inputContainer}>
            <label>{pageData.howmany.label}</label>
            <input
              type="number"
              name="how-many"
              placeholder={pageData.howmany.placeholder}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>{pageData.where.label}</label>
            <input
              type="text"
              name="where"
              placeholder={pageData.where.placeholder}
              required
            />
          </div>
          <button type="submit">Skicka</button>
        </form>
      </div>
    </div>
  )
}

export default HostEventSection
