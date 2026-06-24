import { parseEmailFromAddress } from 'src/utils/parse-email-from-address';

// Escape backslash and double-quote per RFC 5322 quoted-string rules
const escapeDisplayName = (displayName: string): string =>
  displayName.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

export const buildEmailFrom = (
  emailFromAddress: string,
  emailFromName: string,
  options?: { overrideName?: string },
): string => {
  const parsedFromAddress = parseEmailFromAddress(emailFromAddress);
  // overrideName forces a specific display name even when
  // EMAIL_FROM_ADDRESS contains an embedded RFC 5322 name.
  // Used for sender-identity emails (invitations, domain
  // approvals) where the inviter's real name must appear.
  const displayName =
    options?.overrideName ?? (parsedFromAddress.name || emailFromName);

  if (displayName) {
    return `"${escapeDisplayName(displayName)}" <${parsedFromAddress.address}>`;
  }

  return parsedFromAddress.address;
};
