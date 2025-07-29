# Use Nix + flakes support
FROM nixos/nix:2.18.1

# Enable flakes and experimental features
ENV NIX_CONFIG="experimental-features = nix-command flakes"

# Set working directory
WORKDIR /app

COPY . .

# Build the flake shell environment (which includes guile + hoot)
RUN nix develop .# --command true

# Default command
CMD ["guile", "-c", "((@ (hoot web-server) serve))"]
