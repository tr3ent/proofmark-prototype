# Proofmark

**AI-assisted practical skills assessment for Africa's informal workforce.**

> **Positioning:** Built for Africa, validated country by country. Proofmark is continent-wide in ambition, while every pilot must use the standards and authorised assessment processes of the country in which it operates.

Proofmark is an application-stage prototype that demonstrates how informally trained artisans could submit video evidence of their work, have that evidence mapped to a recognised competency standard, and receive a human-reviewed assessment report.

The platform is designed to support Recognition of Prior Learning (RPL). It does **not** replace qualified assessors or issue certificates independently.

## The problem

Across Africa, many welders, mechanics, tailors, carpenters and other artisans learn through informal apprenticeships and years of practical work. They may be highly capable but lack recognised credentials proving what they can do.

Without recognised proof of competence, an artisan can struggle to access:

- Formal employment and larger contracts
- Government procurement opportunities
- Reliable skills verification for employers
- Certain financing and business-growth opportunities
- Portable recognition of skills across regions

Recognition of Prior Learning already provides a route for assessing skills gained outside formal education. However, practical assessment commonly requires a qualified assessor to observe candidates individually. Travel, limited assessor capacity and administrative work make this difficult to scale.

Proofmark explores whether AI can reduce the evidence-review burden while leaving the final decision with the authorised human assessor.

## Who benefits

### Informally trained artisans

They gain a clearer pathway for demonstrating practical competence and pursuing recognised certification through the appropriate authority.

### National skills authorities and accredited assessors

They gain structured, criterion-level evidence that can make assessment review more efficient without surrendering control of the final decision.

### Employers and procurement organisations

They gain a more consistent way to verify practical trade skills after certification by the responsible authority.

## Business model

Proofmark is designed around multiple revenue sources so that access does not depend entirely on an artisan's ability to pay:

- **Affordable artisan subscriptions** for assessment preparation, guided evidence capture and reusable skills profiles
- **Institutional licences and per-assessment fees** for accredited assessment centres, training institutions and employers
- **Sponsored access programmes** funded by governments, employers, development organisations or donors

The pricing and willingness-to-pay assumptions have not yet been validated and remain part of the project's next research phase.

## What the prototype demonstrates

The prototype presents one end-to-end assessment journey for a welding candidate:

1. **Candidate registration** — record basic candidate, trade and assessment information.
2. **Guided evidence capture** — show recording prompts that help a candidate capture useful practical evidence.
3. **AI-prepared findings** — map observable video evidence to five demonstration criteria, with timestamps and confidence indicators.
4. **Assessor review** — allow a qualified assessor to accept, change or request more evidence for every criterion.
5. **Evidence report** — create a printable report that separates AI-prepared findings from the assessor's decisions.

The demonstration includes both positive findings and uncertainty. The simulated analysis deliberately reports partially observed and insufficient evidence instead of approving every criterion.

## Important prototype disclosure

This version does **not** call Gemini or any other live AI model. Its criterion-level findings are fixed demonstration data used to communicate the proposed product workflow while the team is in the Google Africa Applied AI Lab application phase.

It therefore:

- Does not genuinely assess the uploaded video
- Does not make a real competency decision
- Does not issue an official certificate
- Must not be used for employment, procurement or educational decisions

The interface displays this disclosure throughout the workflow and on the final report.

## Proposed AI workflow

With access to suitable models, standards and validation data, the simulated analysis would be replaced by a protected backend workflow:

1. An authorised institution defines the competency standard and observable assessment criteria.
2. The candidate records short, guided clips using a basic smartphone.
3. The application performs local quality checks for blur, framing, duration and missing evidence.
4. The evidence synchronises when connectivity becomes available.
5. Gemini analyses the submitted video against the specified criteria.
6. The model returns structured findings, timestamps, reasons and uncertainty—not a certificate.
7. A qualified assessor reviews every finding, records overrides and makes the final recommendation.
8. The authorised institution retains responsibility for certification.

The intended future model roles are:

- **Gemini:** multimodal video analysis and criterion-level evidence preparation
- **Gemma:** possible on-device guidance and local-language assistance where technically appropriate
- **Veo:** possible generation of authorised demonstration content showing candidates how to capture evidence correctly

These are proposed roles and are not implemented in the current prototype.

## Human oversight and responsible use

Proofmark is designed as an assistive assessment system.

- The AI prepares evidence; it does not certify candidates.
- Every finding must be visible and traceable to a point in the submitted video.
- The assessor can override every AI output.
- Low-confidence and incomplete evidence should trigger human review or a request for additional evidence.
- The final report clearly separates model output from the assessor's judgement.
- No production deployment should occur before agreement studies are conducted with qualified assessors.

Further work would also be required for candidate consent, privacy, secure storage, identity verification, bias evaluation, accessibility, audit history and institutional governance.

## Current demonstration standard

The interface uses five illustrative welding criteria:

- Personal protective equipment
- Workpiece preparation
- Equipment setup
- Welding technique
- Finished-weld inspection

These criteria are included to demonstrate the product interaction. Before any formal pilot, the prototype must be mapped to a current, institution-approved competency standard and reviewed by qualified trade assessors.

### Live Camera Capture and Liveness Verification

While the prototype currently allows users to upload a pre-recorded video for demonstration and testing purposes, the proposed production system will implement **in-app camera capture with liveness detection**. Instead of allowing users to upload externally recorded videos, the application will capture the user directly through the device camera during the verification process. This approach is intended to reduce fraudulent submissions, including the use of pre-recorded videos, manipulated media, deepfakes, or AI-generated content. The system will use liveness verification to determine whether the captured subject is a real, present user rather than a replayed or artificially generated representation, thereby improving the security, authenticity, and reliability of the verification process.


## Run the prototype

No account, API key, model access or installation is required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Select **Use sample evidence** on the evidence-capture screen.
4. Continue through the simulated analysis.
5. Review or change the assessor decisions.
6. Confirm the assessor declaration.
7. Generate and print the demonstration evidence report.

The prototype can also be served using any basic static web server.

### Recommended demonstration route

1. Read the product overview and beneficiary cards.
2. Record the demonstration consent and continue to evidence capture.
3. Choose **Use sample evidence**.
4. Review the simulated criterion-level analysis.
5. Change at least one assessor decision to demonstrate human control.
6. Confirm the assessor declaration and generate the evidence report.
7. Review the business model and responsible development roadmap below the demo.

## Technology

The reviewer-facing prototype is deliberately lightweight:

- HTML
- CSS
- Vanilla JavaScript
- Browser print-to-PDF for the evidence report

Keeping this version dependency-free makes it reliable for demonstrations and easy for reviewers to run locally.

## Project stage

Proofmark is currently at the **research, problem-validation and application-prototype stage**.

Completed work includes:

- Desk research into African Recognition of Prior Learning programmes
- Initial problem definition and beneficiary analysis
- Competitive research into existing prior-learning tools
- Definition of the human-in-the-loop assessment workflow
- A complete interactive demonstration from candidate intake to evidence report

Not yet completed:

- Live Gemini integration
- Collection of authorised assessment videos
- Validation against qualified human assessors
- Partnership or endorsement from TEVETA or another certifying authority
- Production security, identity and data-governance infrastructure

## Market-entry approach

Proofmark is intended to begin with one trade, one approved competency standard and one country-level institutional partner. The platform would only expand after local validation. This avoids treating Africa as one regulatory market and allows each implementation to respect national qualification frameworks, languages and certification rules.

## Validation required

The central research question is whether multimodal model findings agree closely enough with qualified assessors to be useful and safe.

A responsible pilot would compare model-prepared findings with independent assessor judgements on the same evidence. Measures should include criterion-level agreement, false approvals, false rejections, uncertainty calibration, assessor time saved and performance across different recording conditions and candidate groups.

Until that validation is completed, all AI outputs must be treated as experimental evidence assistance only.

## Repository structure

```text
proofmark-prototype/
├── index.html          # Self-contained prototype interface
├── standalone.css      # Standalone styling
├── standalone.js       # Complete demonstration workflow
├── src/                # Component-based interface source
├── package.json        # Optional development setup
└── README.md           # Project documentation
```

## Team

Proofmark is being developed by a two-person student team during the Google Africa Applied AI Lab application process through Northrise University.

## Status and independence

Proofmark is an independent student project. It is not currently endorsed, certified or operated by Google, Northrise University, TEVETA, the International Labour Organization or any national skills authority.

The project name is a working name and remains subject to appropriate legal and trademark checks.
