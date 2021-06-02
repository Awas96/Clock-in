<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use App\Repository\UsuarioRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UsuarioRepository::class)
 * @UniqueEntity(fields={"username"}, message="There is already an account with this username")
 */
class Usuario implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=9)
     * @Assert\Regex(
     *     pattern="/^[XYZ]?([0-9]{7,8})([A-Z])$/",
     *     match=true,
     *     message="El nif no es válido"
     * )
     */
    private $nif;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Email(
     *     message = "El email '{{ value }}' no es un email válido."
     * )
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Regex(
     *     pattern="/^(?=.{6,20})(?=(?:.*\d){2,})(?=.*[A-Z]+).*$/gm",
     *     match=true,
     *     message="La contraseña debe tener mínimo 6 caractéres, 2 numeros y un caracter en mayúscula"
     * )
     */
    private $password;

    /**
     * @ORM\Column(type="integer")
     */
    private $roles = 1;

    /**
     * @ORM\OneToMany(targetEntity=Evento::class, mappedBy="usuario")
     */
    private $evento;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isVerified = false;

    public function __construct()
    {
        $this->evento = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNif(): ?string
    {
        return $this->nif;
    }

    public function setNif(string $nif): self
    {
        $this->nif = $nif;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): array
    {
        $rol = $this->roles;
        $role = [];
        switch ($rol) {
            case 1:
                array_push($role, 'ROLE_MODERADOR');
                array_push($role, 'ROLE_EMPLEADO');
                break;
            case 2:
                array_push($role, 'ROLE_EMPLEADO');
                break;
            case 0:
                $role = ["ROLE_ADMINISTRADOR"];
                break;
        }

        return $role;

    }

    public function setRoles($roles): self
    {

        $this->roles = $roles;

        return $this;
    }


    /**
     * @return Collection|Evento[]
     */
    public function getEvento(): Collection
    {
        return $this->evento;
    }

    public function addEvento(Evento $evento): self
    {
        if (!$this->evento->contains($evento)) {
            $this->evento[] = $evento;
            $evento->setUsuario($this);
        }

        return $this;
    }

    public function removeEvento(Evento $evento): self
    {
        if ($this->evento->removeElement($evento)) {
            // set the owning side to null (unless already changed)
            if ($evento->getUsuario() === $this) {
                $evento->setUsuario(null);
            }
        }

        return $this;
    }

    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getIsVerified(): ?bool
    {
        return $this->isVerified;
    }
}
