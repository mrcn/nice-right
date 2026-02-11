## Making Sure Your Properties Are Set Up Correctly

If your business website spans multiple domains, you might want each domain to report to a separate Google Analytics property or view. Alternatively, there are strong arguments for having all domains report to a single view. Fortunately, it’s relatively simple to configure either setup.

If you’d like to learn why why you might want all your domains and sub-domains reporting to a single view, [you can email me and ask](mailto:marcin@martind93.sg-host.com).

But here I’m going to show you how I did it.

## Step 1: Create a Cross-Domain Tracking “Auto Link” Variable in Google Tag Manager (GTM)

1. Open **Google Tag Manager (GTM)**.
2. Create a new **Auto Link Domains** variable.
3. Add all the domains you want to link together in this variable.Example: `example.com, example2.com`.
This variable will define which domains are linked. Later, you’ll use it to configure your tags

## Step 2: Create a Google “Universal Analytics” Tag & Modify Configuration in Google Tag Manager

Now that you’ve created the variable, let’s use it in a Universal Analytics pageview tag.

1. In GTM, create or edit your Universal Analytics **pageview tag**.
2. Under **Google Analytics Settings**, select the correct UA variable.This determines which Google Analytics property will receive the data.
### Fields to Set

- **allowLinker: true**This setting ensures that data is passed across domains, preserving session continuity. If you omit a domain in your Auto Link variable, tracking will break when users navigate to that domain.
- **cookieName: _rollup**Use a shared cookie name across all linked domains. In this guide, we use `_rollup` to indicate that the data is part of a consolidated view. You can choose a different name if preferred.
### Tag Configuration

In the **Cross-Domain Tracking** section, select the variable you created earlier (`Auto Link Domains`). Initially, you might see “true” entered manually, but make sure to replace it with the correct variable name.

Now that we have a variable which auto-magically links your domains together, we’re going to put it to work inside of our pageview tag. Make sure to select the correct UA variable under “Google Analytics Settings.” The view corresponding to the UA code here is the one which all our data will display to.

### Testing: Real Time Reporting Method

You can do it in “real time” by visiting the domains you linked together and viewing the real time reports. If you, a single user, is showing up as 2 or more users (1 user per page), then it is not correctly set up. However, if you have lots of traffic on your site this method will not work. You simply won’t be able to tell if the difference between the numbers is significant or accurate.

## Step 3: The UTM Method of Testing The Success of Your Cross Domain Tracking

### 3.1 Create UTM and Browse All Domains

### 3.2 The UTM Method

This method tracks a user’s journey using a UTM parameter.

1. **Create a UTM link** using the [Google Campaign URL Builder](https://ga-dev-tools.appspot.com/campaign-url-builder/).
2. Visit your site with the UTM link and navigate across all linked domains.
1. In Google Analytics:- Go to **Behavior > Site Content > All Pages**.
- Create a segment using your UTM source as the traffic source.
- Apply the segment to view all pages visited during the session.The list should show pages from all linked domains in order of visitation.
**Tip:** Ensure the view you’re using does not filter out your IP address. Filtering your own traffic can lead to misleading results.

## Troubleshooting Common Issues

- **Session Breaks:** Double-check your Auto Link Domains variable to ensure all linked domains are included.
- **Cookie Errors:** Verify that all linked domains use the same cookie name in their configurations.
- **Real-Time Testing Fails:** Use the UTM method for precise results.

## Videos

- **Video File:** https://uxoxo.xyz/wp-content/uploads/2019/05/1-cross-domain-01.mp4
- **Video File:** https://uxoxo.xyz/wp-content/uploads/2019/05/2-cross-domain-02.mp4
- **Video File:** https://uxoxo.xyz/wp-content/uploads/2019/05/3-creating-utm-and-browsing-site.mp4
- **Video File:** https://uxoxo.xyz/wp-content/uploads/2019/05/4-create-segment-from-utm-and-view-pages.mp4