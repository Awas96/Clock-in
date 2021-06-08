<?php

namespace App\Entity;

use App\Repository\TurnosPredefinidosRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TurnosPredefinidosRepository::class)
 */
class TurnosPredefinidos
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="time")
     */
    private $hora_inicio;

    /**
     * @ORM\Column(type="time")
     */
    private $hora_Fin;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHoraInicio(): ?DateTimeInterface
    {
        return $this->hora_inicio;
    }

    public function setHoraInicio(DateTimeInterface $hora_inicio): self
    {
        $this->hora_inicio = $hora_inicio;

        return $this;
    }

    public function getHoraFin(): ?DateTimeInterface
    {
        return $this->hora_Fin;
    }

    public function setHoraFin(DateTimeInterface $hora_Fin): self
    {
        $this->hora_Fin = $hora_Fin;

        return $this;
    }
}
