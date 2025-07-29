{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
  };
  outputs = { self, nixpkgs, ... }@inputs :
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
      {
        devShells.x86_64-linux.default = pkgs.mkShellNoCC {
          buildInputs = with pkgs; [guile guile-hoot guile-goblins guile-fibers guile-gnutls];
        };
      };
}
