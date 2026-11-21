# Frontend Development Workflow & Design System

คู่มือมาตรฐานการทำงานและสถาปัตยกรรมโค้ดสำหรับโปรเจกต์ `00-portfolio-website` (และใช้เป็นต้นแบบสำหรับโปรเจกต์ Vanilla HTML/CSS/JS ในอนาคต)

---

## 1. Core Philosophy (แนวคิดหลักในการพัฒนา)

1. **Fluid & Intrinsic Design:** ปล่อยให้เบราว์เซอร์คำนวณขนาดและระยะห่างแบบลื่นไหลทุกพิกเซลด้วย `clamp()`, CSS Grid (`fr`), และหน่วยสัมพัทธ์ ใช้ `@media` **เฉพาะจุดที่โครงสร้างต้องเปลี่ยนรูปทรงจริงๆ เท่านั้น**
2. **Proven Defaults First:** เริ่มโปรเจกต์จากค่ามาตรฐานที่พิสูจน์แล้วว่าใช้งานได้ดี (เช่น Modern Reset, Single Left Rail, และสเกลจาก [Utopia](https://utopia.fyi/)) แล้วค่อยปรับจูนตามบุคลิกของดีไซน์
3. **Single Left Rail:** ใช้ `.container` กลางครอบเนื้อหาทุก Section เพื่อล็อกแนวขอบซ้าย-ขวาให้ตรงกันเป็นเส้นเดียวตลอดทั้งเว็บ
4. **Separation of Concerns:**
   - **HTML:** โครงสร้างและความหมาย (Semantic)
   - **CSS:** แยกชั้นชัดเจนระหว่างฐานระบบ (`variables`, `reset`, `layout`) กับหน้าตาราย Section
   - **JavaScript:** จัดการ Logic และสลับสถานะคลาส (เช่น `.active`) โดยไม่แก้สไตล์ Inline ตรงๆ
5. **DRY (Don't Repeat Yourself):** หากคอมโพเนนต์หรือสไตล์ใดถูกใช้ซ้ำตั้งแต่ 2 Section ขึ้นไป ให้ย้ายไปรวมศูนย์ไว้ที่ `layout.css`

---

## 2. Project Structure & Cascade Order

```text
00-portfolio-website/
├── assets/
│   └── images/                # รูปภาพที่บีบอัดขนาดแล้ว (ระดับหลักร้อย KB)
├── css/
│   ├── variables.css          # 1. Design Tokens (Colors, Fonts, Fluid Scales)
│   ├── reset.css              # 2. Modern Intrinsic Reset
│   ├── layout.css             # 3. Shared Container, Buttons & Reusable Typography
│   ├── header.css             # 4. Section 0 : Header & Navigation
│   ├── hero.css               # 5. Section 1 : Hero
│   └── about.css              # 6. Section 2 : About
├── js/
│   └── script.js              # DOM Manipulation & Event Listeners
├── index.html                 # Main Entry Point
└── WORKFLOW.md                # คู่มือฉบับนี้
```

### ลำดับการโหลดไฟล์ใน `index.html` (ห้ามสลับลำดับ)

1. Google Fonts (`Inter`, `Roboto Mono`)
2. `variables.css` → `reset.css` → `layout.css` (จากกว้างไปแคบ)
3. ไฟล์ CSS ราย Section (`header.css`, `hero.css`, `about.css`, ...)
4. `<script src="./js/script.js"></script>` วางก่อนปิดแท็ก `</body>`

---

## 3. Design System Reference (Updated)

### Design Tokens (`css/variables.css`)

| หมวดหมู่             | Token                   | ค่ามาตรฐานปัจจุบัน                             |
| :------------------- | :---------------------- | :--------------------------------------------- |
| **Colors**           | `--bg-color`            | `#222222`                                      |
|                      | `--text-color`          | `#e2e2e2`                                      |
|                      | `--accent-color`        | `#00ffa3`                                      |
|                      | `--border-color`        | `#3f3f3f`                                      |
| **Fonts**            | `--font-display`        | `"Inter", sans-serif`                          |
|                      | `--font-mono`           | `"Roboto Mono", monospace`                     |
| **Fluid Spacing**    | `--container-max-width` | `1600px`                                       |
|                      | `--page-gutter`         | `clamp(1.25rem, 3.5vw, 4rem)`                  |
|                      | `--section-padding-y`   | `clamp(3.5rem, 7vw, 6.5rem)`                   |
|                      | `--grid-gap`            | `clamp(1.5rem, 4vw, 4rem)`                     |
| **Fluid Type Scale** | `--text-hero`           | `clamp(2.125rem, 1rem + 4vw, 4.75rem)`         |
|                      | `--text-section-title`  | `clamp(1.125rem, 0.9rem + 1.2vw, 2rem)`        |
|                      | `--text-subheading`     | `clamp(1rem, 0.85rem + 0.4vw, 1.1875rem)`      |
|                      | `--text-body`           | `clamp(0.9375rem, 0.9rem + 0.25vw, 1.0625rem)` |
|                      | `--text-sm`             | `0.875rem`                                     |

> **Tip สำหรับโปรเจกต์ใหม่:** ใช้ [Utopia Type & Space Scale Calculator](https://utopia.fyi/) คำนวณสูตร `clamp(rem, rem + vw, rem)` เพื่อรองรับการซูมหน้าจอตามหลัก Accessibility แล้วนำมาแมปเป็นชื่อ Semantic Tokens ใน `variables.css`

### Shared Primitives (`css/layout.css`)

- **`.container`**: `width: 100%`, `max-width: var(--container-max-width)`, `margin-inline: auto`, `padding-inline: var(--page-gutter)`
- **`.section-title`**: หัวข้อหลักของทุก Section (`--font-display`, `--text-section-title`, `font-weight: 800`, `line-height: 1.1`)
- **`.btn-primary`**: ปุ่มหลักพื้นสี `--accent-color` ตัวอักษรสี `--bg-color`
- **`.btn-outline`**: ปุ่มรองขอบสี `--text-color` พื้นโปร่งใส

### Layout Patterns & Structural Breakpoints

- **Header (`header.css`):** Flexbox `justify-content: space-between`
- **Hero (`hero.css`):** CSS Grid `clamp(130px, 18vw, 280px) 1fr`
- **About (`about.css`):** CSS Grid `5fr 6fr` (`align-items: start`)
- **Breakpoint 1 — Tablet (`@media (max-width: 1000px)`):** สลับเมนูหลักเป็น Hamburger Dropdown Menu
- **Breakpoint 2 — Mobile (`@media (max-width: 750px)`):** ซ่อนปุ่มเล็กบน Header, ยุบ Grid ทุก Section เป็น `1fr`, ปรับปุ่มเฉพาะใน Section นั้นให้กว้าง `100%`

### JavaScript Architecture (`js/script.js`)

จัดระเบียบโค้ดเป็นโซนชัดเจนเพื่อความอ่านง่าย:

1. `Section 1 : DOM Elements Selection` — ประกาศ `const` เลือก DOM Elements ทั้งหมด
2. `Section 2–4 : State & Helper Functions` — (เพิ่มเมื่อมี Logic ซับซ้อนขึ้น)
3. `Section 5 : Event Listeners` — ผูก Event และสั่งสลับคลาส `.active`

---

## 4. Repeatable Build Loop (ขั้นตอนทำทุก Section ใหม่)

ทำตาม 6 ขั้นตอนนี้วนเป็นรอบทุกครั้งที่เพิ่ม Section ใหม่ (เช่น `Skills`, `Projects`, `Contact`):

### Step 1: แยก Branch จาก `main`

```bash
git checkout main
git checkout -b feature/<section-name>
```

### Step 2: วิเคราะห์ Reference & วาง Semantic HTML

- วิเคราะห์สัดส่วนคอลัมน์จากภาพต้นแบบ
- ขึ้นโครงสร้างมาตรฐานเสมอ:

```html
<section id="<name>" class="<name>-section">
  <div class="container <name>-container">
    <!-- Content -->
  </div>
</section>
```

- ใช้เนื้อหาจริงและเรียกใช้คลาสกลาง (`.section-title`, `.btn-primary`, `.btn-outline`) ทันที
- **Commit #1:** `feat(portfolio): add base html structure for <name> section`

### Step 3: เขียน Fluid CSS ราย Section

- สร้างไฟล์ `css/<name>.css` และลิงก์ต่อท้ายใน `index.html`
- ใช้ตัวแปรจาก `variables.css`, CSS Grid (`fr`, `clamp()`), และ Logical Properties (`padding-block`, `margin-inline`)
- **Commit #2:** `style(portfolio): add <name>.css and fluid grid layout`

### Step 4: เพิ่ม Structural Breakpoints

- เพิ่ม `@media (max-width: 750px)` (หรือ `1000px` หากจำเป็น)
- **กฎสำคัญ:** ระบุคลาสแม่กำกับเสมอเมื่อแก้คลาสกลางใน `@media` (เช่น `.about-right .btn-outline` หรือ `.about-section .section-title`) เพื่อไม่ให้สไตล์รั่วไหลไปทับ Section อื่น
- **Commit #3:** `style(portfolio): implement responsive layout for <name> section`

### Step 5: เพิ่ม JavaScript Interaction (ถ้ามี)

- เขียนแยกโซนใน `js/script.js` และควบคุมสถานะผ่านการเพิ่ม-ลบคลาส CSS
- **Commit #4:** `feat(portfolio): implement <feature> functionality`

### Step 6: Refactor, ใส่ Comment และ Merge เข้า `main`

- ตรวจสอบโค้ดซ้ำซ้อน หากมีให้ย้ายเข้า `layout.css`
- ใส่ Comment สั้นๆ อธิบายเฉพาะจุดสำคัญ ("ทำไม" หรือ "ขอบเขตของบล็อก")
- ทดสอบทุกความกว้างหน้าจอ แล้ว Merge และลบ Branch ย่อย:

```bash
git checkout main
git merge feature/<section-name>
git branch -d feature/<section-name>
git push origin main
```

---

## 5. Defensive CSS Checklist (กันบั๊กล่วงหน้า)

- [ ] **Reset ปุ่ม:** ใช้ `background-color: transparent;` ใน `reset.css` (ห้ามใช้ `none`)
- [ ] **Viewport Height:** ใช้ `min-height: 100dvh;` กับ `body` เพื่อรองรับแถบ URL บนมือถือ
- [ ] **Prevent Grid Blowout:** ใส่ `min-width: 0;` ให้กล่องเนื้อหาที่เป็นลูกของ Grid/Flex เสมอ
- [ ] **Readable Measure:** จำกัดความกว้างย่อหน้าข้อความด้วย `max-width: 55ch–65ch` (มาตรฐาน `60ch`)
- [ ] **Balanced Headings:** ใช้ `text-wrap: balance;` กับ `h1`–`h4`
- [ ] **Image Ratio:** ใช้ `aspect-ratio` คู่กับ `object-fit: cover;` เพื่อกันภาพเบี้ยว
- [ ] **Specific Transitions:** ระบุชื่อ Property ที่จะทำ Transition เฉพาะเจาะจง (เช่น `opacity`, `transform`, `background-color`) แทนการใช้ `transition: all`
- [ ] **External Links:** ลิงก์ที่เปิดแท็บใหม่ (`target="_blank"`) ต้องใส่ `rel="noopener noreferrer"` เสมอ

---

## 6. Git & Conventional Commits Standard

รูปแบบมาตรฐาน: `<type>(<scope>): <คำอธิบายภาษาอังกฤษ ตัวพิมพ์เล็ก กริยาช่อง 1 ไม่ใส่จุดปิดท้าย>`

| Type       | ความหมายและการใช้งาน                                            | ตัวอย่าง                                                              |
| :--------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `chore`    | ตั้งค่าโปรเจกต์ โครงสร้างโฟลเดอร์ หรือไฟล์ระบบ                  | `chore(portfolio): initialize portfolio website project setup`        |
| `feat`     | เพิ่มโครงสร้าง HTML, Section ใหม่ หรือฟีเจอร์ JS                | `feat(portfolio): add base html structure for skills section`         |
| `style`    | เพิ่ม/ปรับแต่ง CSS, Layout, สี, ฟอนต์, Responsive               | `style(portfolio): add about.css and 2-column grid layout`            |
| `refactor` | ปรับโครงสร้างโค้ดให้สะอาดขึ้นโดยผลลัพธ์เดิมไม่เปลี่ยน           | `refactor(portfolio): extract shared buttons to layout css`           |
| `fix`      | แก้ไขบั๊กใน HTML, CSS หรือ JS                                   | `fix(portfolio): set transparent background on hamburger menu toggle` |
| `docs`     | เพิ่ม Comment อธิบายโค้ด หรืออัปเดต `README.md` / `WORKFLOW.md` | `docs(portfolio): add workflow and design system documentation`       |

**กฎทอง:** `1 Commit = 1 ภารกิจย่อยที่ทำงานได้จริง` ไม่นำการแก้บั๊ก, การเปลี่ยนดีไซน์, และการสร้างฟีเจอร์ใหม่มารวมใน Commit เดียวกัน

---

## 7. Pre-Merge & Deployment Checklist

- [ ] ลากย่อ-ขยายหน้าจอใน Chrome DevTools ตั้งแต่ `320px` ถึง `1600px+` ไม่มี Horizontal Scrollbar
- [ ] ขอบซ้ายของทุก Section ตรงแนว `.container` เดียวกันเป๊ะ
- [ ] รูปภาพใหม่ใน `assets/images/` ถูกบีบอัดให้ขนาดเบาแล้ว
- [ ] ไม่มี Error ใน DevTools Console และ Interaction ทำงานครบถ้วน
- [ ] **GitHub Pages Live URL:** ตรวจสอบหน้าเว็บจริงหลัง Push ที่ subpath `https://ampol-clerc.github.io/javascript-dom-practice/00-portfolio-website/`
