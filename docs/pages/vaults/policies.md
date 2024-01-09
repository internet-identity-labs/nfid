---
title: Policies
position: 64
category: NFID Vaults
description: "The complete guide to NFID"
---

<img src="../vault-policies.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

## Creating a new policy

In this current version of NFID Vaults, the person who created the Vault has the one and only Admin
role who is able to add or remove policies.

A policy consists of:

- **Source** accounts from which transactions originate
- **Greater than** amounts at which point this policy will take effect
- **Approvers** required to approve a transaction

## Creating your policy strategy

By default, a "catch-all" policy is created where any amount from any wallet will require the
approval from all members and admins in the vault.

Keep in mind the following when creating your policy strategy:

### Individual wallet policies take precedent over policies applied to "Any" wallet

Consider these policies: |Policy number|Source|Greater than|Approvers| |---|---|---|---| |1|Any|0|2
of 10| |2|Example wallet 1|0|All|

Policy 2 will take effect for transactions sourced from Example wallet 1 greater than 0 ICP because
this policy was specifically applied to this source.

### If a wallet (or Any source) has one or more policies available, a transaction will trigger the policy with the highest value first and approver threshold next

Consider these policies: |Policy number|Source|Greater than|Approvers| |---|---|---|---| |1|Any|0|2
of 10| |2|Example wallet 1|0|All| |3|Example wallet 1|10|All| |4|Example wallet 1|20|2 of 10|
|5|Example wallet 1|20|All|

Policy 2 will take effect for transactions sourced from Example wallet 1 of a value between 0 ICP
and <10 ICP. Policy 3 will take effect for transactions sourced from Example wallet 1 of a value
between 10 ICP and <20 ICP. Policy 5 will take effect for transactions sourced from Example wallet 1
of a value greater than or equal to 20 ICP. Policy 4 could exist but will never take effect because
policy 5 will always take precedent.

### Make sure no gaps exist in your policy workflows

Consider these policies: |Policy number|Source|Greater than|Approvers| |---|---|---|---| |1|Any|10|2
of 10| |2|Example wallet 1|10|All|

Transactions sourced from Example wallet 1 of a value <10 ICP will be automatically approved in this
case because there is no applicable policy.

### Known minor issues

Policies can have more approvers than members in a vault. All this means is there will need to be
another approver added to the vault or this policy would need to be updated for transactions this
policy catches to ever be approved.

## Updating a policy

Admins can update policies by editing them from the three-dot menu to the right of each policy.

## Removing a policy

Admins can archive policies from the three-dot menu to the right of each policy.
